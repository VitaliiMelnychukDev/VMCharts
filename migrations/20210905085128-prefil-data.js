module.exports = {
  async up(db, client) {
    const createdSongs = await db.collection('songs').insert([
        {name: 'Linkin Park', author: 'In The End', year: 2001},
        {name: 'Linkin Park', author: 'Numb', year: 2004},
        {name: 'Green Day', author: 'Boulevard Of Broken Dreams', year: 2005},
        {name: 'BMTH', author: 'Throne', year: 2015},
        {name: 'BFMV', author: 'Tears Don\'t Fall', year: 2005},
      ]);
    const chartSongs = [
      {
        position: 1,
        song: createdSongs.insertedIds[0]
      },
      {
        position: 2,
        song: createdSongs.insertedIds[1]
      },
      {
        position: 3,
        song: createdSongs.insertedIds[2]
      },
      {
        position: 4,
        song: createdSongs.insertedIds[3]
      },
      {
        position: 5,
        song: createdSongs.insertedIds[4]
      }
    ];

    await db.collection('charts').insert(
      {
        name: 'Top 100 Rock Songs',
        genre: 'general',
        slug: 'top-100-rock-songs',
        songs: chartSongs
      });
  },

  async down(db, client) {
  }
};
