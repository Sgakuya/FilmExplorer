import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  getFirestore,
  getDocs,
  collection,
  terminate,
} from "firebase/firestore";

import FilmExplorer from "./FilmExplorer";
import {
  initializeFirebase,
  loadData,
  clearCollection,
} from "../utils/firebase-utils.mjs";

const films = [
  {
    id: 101,
    overview: "The first Thin Man movie",
    release_date: "1934-05-25",
    poster_path: "/rEXmQIgG8aHiZZbYAPdJjZNUxa.jpg",
    title: "The Thin Man",
    vote_average: 7.7,
  },
  {
    id: 102,
    overview: "The second Thin Man movie",
    release_date: "1936-12-25",
    poster_path: "/1fkCHOffEkPOY0UwSrvzG6YKDVp.jpg",
    title: "After the Thin Man",
    vote_average: 7.6,
  },
];

describe("FilmExplorer tests", () => {
  let db;
  beforeAll(() => {
    initializeFirebase();
    db = getFirestore();
  });

  afterAll(async () => {
    await terminate(db);
  });

  beforeEach(async () => {
    // clear out any old data
    await clearCollection("films");

    // load the test films
    await loadData(films, "films");
  });

  describe("Fetching movie data", () => {
    test("Using fetched data", async () => {
      render(<FilmExplorer />);
      await screen.findByText(films[0].title);
      screen.findByText(films[1].title);
    });
  });

  describe("Setting ratings", () => {
    test("Rating changes", async () => {
      render(<FilmExplorer />);
      let stars = await screen.findAllByText("★");

      expect(stars.filter((star) => star.className === "empty")).toHaveLength(
        10
      );
      expect(stars.filter((star) => star.className === "filled")).toHaveLength(
        0
      );

      fireEvent.click(stars[4]);

      await waitFor(() => {
        expect(screen.getAllByText("★")[0]).toHaveClass("filled");
      });

      stars = screen.getAllByText("★");
      expect(stars.filter((star) => star.className === "empty")).toHaveLength(
        5
      );
      expect(stars.filter((star) => star.className === "filled")).toHaveLength(
        5
      );
    });

    test("Rating updated in database", async () => {
      render(<FilmExplorer />);
      const stars = await screen.findAllByText("★");

      fireEvent.click(stars[4]);
      await waitFor(() => {
        expect(screen.getAllByText("★")[0]).toHaveClass("filled");
      });
      fireEvent.click(stars[5]);
      await waitFor(() => {
        expect(screen.getAllByText("★")[5]).toHaveClass("filled");
      });
      const docSnapshot = await getDocs(collection(db, "films"));
      const documents = docSnapshot.docs.map((d) => d.data());
      documents.sort((d1, d2) =>
        d1.release_date.localeCompare(d2.release_date)
      );

      expect(documents[1].rating).toBe(5);
      expect(documents[0].rating).toBe(1);
    });
  });
});
