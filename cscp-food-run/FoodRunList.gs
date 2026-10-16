/**
 * CSCP Food Run – Current People
 *
 * Rewrites the first tab of THIS spreadsheet with the people in the
 * "Current" layer of the CSCP altea/albir Google My Maps map.
 * The file is updated in place, so its link and sharing never change.
 *
 * Setup (once): Extensions → Apps Script, paste this file, save,
 * then run installSchedule and approve the permissions prompt.
 * After that it runs every day at 12am and 12pm Spain time, and a
 * "Food Run" menu in the sheet has "Refresh now".
 */

const MAP_KML_URL =
  'https://www.google.com/maps/d/kml?mid=1jjVB0w5Bqr6ANUWzlpRGtG3sXvkdNc4&forcekml=1';
const LAYER_NAME = 'Current';
const TIME_ZONE = 'Europe/Madrid';
const RUN_HOURS = [0, 12];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Food Run')
    .addItem('Refresh now', 'refreshFoodRunList')
    .addToUi();
}

/** Creates the 12am / 12pm triggers, replacing any earlier ones. */
function installSchedule() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'refreshFoodRunList')
    .forEach(t => ScriptApp.deleteTrigger(t));
  RUN_HOURS.forEach(hour =>
    ScriptApp.newTrigger('refreshFoodRunList')
      .timeBased()
      .everyDays(1)
      .atHour(hour)
      .inTimezone(TIME_ZONE)
      .create());
  refreshFoodRunList();
}

function refreshFoodRunList() {
  // Fetch and parse first; if anything fails the sheet is left untouched.
  const people = fetchCurrentPeople_();
  const totalMeals = people.reduce((sum, p) => sum + (p.meals || 0), 0);
  const updated = Utilities.formatDate(new Date(), TIME_ZONE, 'd MMM yyyy HH:mm');

  const rows = [
    ['CSCP Food Run – Current People', '', '', ''],
    ["Updated from the CSCP altea/albir map ('" + LAYER_NAME + "' layer) at " + updated +
      ' (Spain). Refreshed automatically at 12am and 12pm – edit the map, not this sheet.', '', '', ''],
    ['Total meals:', totalMeals, 'People:', people.length],
    ['Name', 'Meals', 'Where / notes', 'Map link'],
  ];
  people.forEach(p => rows.push([
    p.name,
    p.meals === null ? '' : p.meals,
    p.notes,
    p.lat ? '=HYPERLINK("https://www.google.com/maps/search/?api=1&query=' +
      p.lat + ',' + p.lng + '","📍 Open")' : '',
  ]));

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.clearContents();
  sheet.getRange(1, 1, rows.length, 4).setValues(rows);

  sheet.getRange('A1').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A2').setFontStyle('italic');
  sheet.getRange('A3:D4').setFontWeight('bold');
  sheet.setFrozenRows(4);
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 60);
  sheet.setColumnWidth(3, 420);
  sheet.setColumnWidth(4, 90);
  if (people.length) {
    sheet.getRange(5, 3, people.length, 1).setWrap(true);
  }
}

function fetchCurrentPeople_() {
  const response = UrlFetchApp.fetch(MAP_KML_URL, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    throw new Error('Could not read the map (HTTP ' + response.getResponseCode() +
      '). Is it still shared "anyone with the link"?');
  }
  const root = XmlService.parse(response.getContentText()).getRootElement();
  const ns = root.getNamespace();
  const folder = root.getChild('Document', ns).getChildren('Folder', ns)
    .find(f => (f.getChildText('name', ns) || '').trim() === LAYER_NAME);
  if (!folder) {
    throw new Error('No layer called "' + LAYER_NAME + '" on the map.');
  }

  return folder.getChildren('Placemark', ns).map(pm => {
    const title = (pm.getChildText('name', ns) || '').trim();
    const match = title.match(/^(.*?)[\s\-–]*(\d+)\s*meals?\s*$/i);

    const description = pm.getChildText('description', ns) || '';
    let notes = description.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (/<img/i.test(description)) {
      notes = (notes + ' (Photo on map)').trim();
    }

    let lat = '';
    let lng = '';
    const point = pm.getChild('Point', ns);
    if (point) {
      const coords = (point.getChildText('coordinates', ns) || '').trim().split(',');
      lng = coords[0];
      lat = coords[1];
    }

    return {
      name: match ? match[1].trim() : title,
      meals: match ? Number(match[2]) : null,
      notes: notes,
      lat: lat,
      lng: lng,
    };
  });
}
