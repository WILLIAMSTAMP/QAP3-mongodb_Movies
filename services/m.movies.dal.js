const { ObjectId } = require("mongodb");
const dal = require("./mdb");



async function getMovies() {
  if(DEBUG) console.log("movies.mongo.dal.getmovies()");
  try {
    await dal.connect();
    const cursor = dal.db("sample_mflix").collection("movies").find().limit(20);
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  }
};


async function getMovieByMovieId(id, poster, plot) {
  if(DEBUG) console.log("movies.mongo.dal.getMovieByMovieId()");
  try {
    await dal.connect();
    const result = dal.db("sample_mflix").collection("movies").findOne({ _id: ObjectId(id, poster, plot) });
    return result;
  } catch(error) {
    console.log(error);
  }
};


async function addMovie(title, plot) {
  if(DEBUG) console.log("actors.mongo.dal.addActor()");
  let newMovie = JSON.parse(`{ "title": "` + title + `", "plot": "` + plot + `" }`);
  try {
    await dal.connect();
    const result = await dal.db("sample_mflix").collection("movies").insertOne(newMovie);
    return result.insertedId;
  } catch(error) {
    console.log(error);
  }
};

async function putMovie(id, title, plot, poster) {
  if(DEBUG) console.log("movies.mongo.dal.putMovie()");
  try {
    await dal.connect();
    const result = await dal.db("sample_mflix").collection("movies")
      .replaceOne({_id: ObjectId(id, poster, plot, title)},
        {title: title, plot: plot, poster: poster, }
        );
    return result;
  } catch(error) {
    console.log(error);
  }
};


async function patchMovie(id, title, plot, poster) {
  if(DEBUG) console.log("movies.mongo.dal.patchMovie()");
  try {
    await dal.connect();
    const result = await dal.db("sample_mflix").collection("movies")
      .updateOne({_id: ObjectId(id)},
        {$set: {title: title,
        plot: plot,
        poster: poster}},
        {upsert: true, returnDocument: 'after'}
        );
    return result;
  } catch(error) {
    console.log(error);
  }
};


async function deleteMovie(id, title) {
  if(DEBUG) console.log("movies.mongo.dal.deleteMovie()");
  try {
    await dal.connect();
    const result = dal.db("sample_mflix").collection("movies").deleteOne({_id: ObjectId(id, title)})
    return result;
  } catch(error) {
    console.log(error);
  }
};



module.exports = {
    getMovies,
    getMovieByMovieId,
    addMovie,
    putMovie,
    patchMovie,
    deleteMovie,
  }