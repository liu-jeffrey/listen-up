import { ITranscript } from '../models/PeopleModels';

export const stringify = (transcript: ITranscript): String[] => {
    let stringList: string[] = [];

    Object.keys(transcript).forEach((key) => {
      let string = "";

      if (key === "friends") {
          string = "Friends";
      } else if (key === "giftIdeas") {
          string = "Gift Ideas";
      } else if (key === "locationsOfInterest") {
          string = "Locations of Interest";
      } else if (key === "organization") {
          string = "Organizations";
      }

      string = string.concat(": ");

      if (transcript !== undefined) {
        string = string.concat(transcript[key]!.join(", "));
      }

      stringList.push(string);
    })

    return stringList;
  }