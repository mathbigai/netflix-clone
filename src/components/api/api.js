const API_KEY = "f8d4d9f0c9fd0ca0d0939b0142408e78";

const categories = [
  {
    name: "trending",
    title: "Em alta",
    path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
    isLarge: true,
    type: "all",
  },
  {
    name: "netflixOriginals",
    title: "Originais Netflix",
    path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    isLarge: false,
    type: "tv",
  },
  {
    name: "comedy",
    title: "Comédias",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    isLarge: false,
    type: "tv",
  },
  {
    name: "action",
    title: "Ação",
    path: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    isLarge: false,
    type: "movie",
  },
  {
    name: "romances",
    title: "Romances",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    isLarge: false,
    type: "tv",
  },
  {
    name: "documentaries",
    title: "Documentários",
    path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    isLarge: false,
    type: "tv",
  },
  {
    name: "horror",
    title: "Terror",
    path: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    isLarge: false,
    type: "movie",
  },
];

export const getMovies = async (path) => {
  try {
    let url = `https://api.themoviedb.org/3${path}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getMovies: ", error);
  }
};

export const getMovieInfo = async (movieId, type, language) => {
  try {
    let url = `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${API_KEY}&${language}&include_image_language=pt,en,en,cs,es&append_to_response=release_dates`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getMovieInfo: ", error);
  }
};

export const getSearch = async (query, page) => {
  try {
    let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=false&region=pt-BR`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getSearch: ", error);
  }
};

export const getCredits = async (id, type) => {
  try {
    let url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=pt-BR`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getCredits: ", error);
  }
};

export const getLogoMedia = async (id, type) => {
  try {
    let url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${API_KEY}&append_to_response=images&include_image_language=pt,en,cs, es`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getMovieInfo: ", error);
  }
};

export const getLinkTrailer = async (id, type) => {
  try {
    let url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getLinkTrailer: ", error);
  }
};

export const getPersonMedia = async (personId) => {
  try {
    let url = `https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${API_KEY}&language=pt-BR`;
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    console.log("error getLinkTrailer: ", error);
  }
};

export const getPersonBio = async (personId, language) => {
  try {
    let url = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&${language}`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getLinkTrailer: ", error);
  }
};

export const getCertificate = async (id, type) => {
  try {
    let url;
    if (type === "movie") {
      url = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`;
    } else {
      url = `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${API_KEY}&language=pt-BR`;
    }
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getLinkTrailer: ", error);
  }
};

export const getColetion = async (id, language) => {
  try {
    let url = `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}&${language}`;
    const response = await fetch(url);
    return await response.json();
   
  } catch (error) {
    console.log("error getLinkTrailer: ", error);
  }
};

export default categories;
