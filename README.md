# Autocomplete

This project is created via create-react-app and is deployed at [https://joseph-autocomplete.netlify.app/]

## Starting the app

In the project directory, you can run the following to start locally:

`yarn start`

## Notes

#####

In regards to CSS decision of using CSS-in-JS pattern with styled-components.

- Great developer experience - Tracking your components and styles is simple as they live in the same file as your components.
- Can apply complex javascript logic instead of trying to deal with classNames.
- Have mostly just worked with styled-components professionally and do not have time to ramp up to use best practices with other methodologies.

#####

In regards to the data, in order to easily group the results, manipulated data with functions located in utils:

```
[
    ["TYPE", [{name: string:, url: string, type: string}]],
    ["TYPE", [{name: string:, url: string, type: string}]],

]
```

Nominally, the backend would provide us with a limited data set so there won't be a big performance issue in regards to the size of the data set. Eg: Wayfair would return only 9 objects for their query.

#####

## Considerations

In regards to search, if this was an backend intensive query we have multiple ways of limiting stress on backend.

- A simple solution can be to start query only if there are 2 or more characters in the string.

- Use a debouncer. In doing so, the search query will not run until only after the user stops typing. This would prevent multiple queries for each character types

- We can also combine both solutions.
