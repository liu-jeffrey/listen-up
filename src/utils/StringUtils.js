import { TYPE_MAP } from '../models/PeopleModels';

export const stringify = (transcript) => {
    let stringList = [];

    Object.keys(transcript).forEach((key) => {
      let string = "";

      if (transcript !== undefined) {
        let mappedName = TYPE_MAP[key];
        if (mappedName && transcript[key] && transcript[key].size !== 0) {
          string = string.concat(mappedName, ": ");
        }

        string = string.concat(transcript[key].join(", "));
      }

      stringList.push(string);
    })

    return stringList;
  }