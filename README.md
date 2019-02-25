# SEM Simple Interface
An example of a simple Google Sheet-like interface that can be used to interact with other teams, based on [Handsontable](https://handsontable.com).

Unlike Google Sheets, it gives us full flexibility in validation logic and displaying additional data.

## Usage
1. Adjust `src/main.js` to your needs, specifying the schema, the read-only fields and validation. Documentation of the plugin is available [here](https://handsontable.com/docs/6.2.2/tutorial-introduction.html)
2. Upload updated version to Github Pages (or an S3 bucket), send the link to interface to the users.
3. Send CSVs input files to the users.
4. Users upload their CSV files into the interface, make changes, and click "Download button" and send the result back.

## Example

An [example interface](https://getyourguide.github.io/sem-simple-interface/dist/) is deployed with Github Pages. It expects a CSV with a list of burning search queries with the following columns:
1. search_query
2. landing_page
3. cost

This interface can be used to ask other teams to identify negative keywords that could reduce costs.

## Development and Deployment

1. Update files in src/ directory.
2. Run `npm run-script build`
3. Open `dist/index.html` in a browser to see your changes.
4. Commit all changes, including to `dist` folder and push to the master branch.

