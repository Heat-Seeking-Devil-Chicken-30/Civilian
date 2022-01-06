const db = require('../../server/database');
const request = require('supertest');
const { doesNotMatch } = require('assert');
const bcrypt = require('bcrypt');

const server = 'http://localhost:3000';

describe('Route Integration Tests', () => {
  //Test EndPoints
  //  get /users

  xdescribe('/users', () => {
    it('returns existing users', () => {
      return request(server)
        .get('/api/users')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  xdescribe('/incidents', () => {
    it('returns existing incidents', () => {
      return request(server)
        .get('/api/incidents')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('returns existing incidents by user', () => {
      const credentials = {
        name: 'Johnson',
        password: '123',
      };
      return request(server)
        .post('/api/incidents/user')
        .send(credentials)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  get /incidents/location/:name
    it('returns existing incidents by street name', () => {
      const streetName = 'BROOKLYN';

      return request(server)
        .get('/api/incidents/location/' + streetName)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });

  describe('/post', () => {
    let incident_id;

    it('adds an incident event', async () => {
      const incident_entry = {
        title: 'Another Test Title',
        street_name: '237 Arnold Drive Staten Island, NY 10314, United States',
        video_url: '',
        image_url: '',
        details: 'Test Location',
      };

      //Addeds Incident
      incident_id = await request(server)
        .post('/api/postevent')
        .send(incident_entry)
        .expect('Content-Type', /application\/json/)
        .expect(201)
        .then((res) => res.body.incident_id);

      // const queryString = `DELETE FROM "public"."incident" WHERE incident_id=${incident_id}`;
      // await db.query(queryString);
    });

    //  put /incidents/update-title:id
    it('updates the title in incident event', () => {
      const updatedTitle = { title: 'Updated Test Title' };

      request(server)
        .put('/api/incidents/update-title' + incident_id)
        .send(updatedTitle)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  put /incidents/update-streetname:id
    it('updates the streetname in incident event', () => {
      const updatedStreetName = {
        streetname: '25 Kent Dr. Bronx, NY 10466, United States',
      };

      request(server)
        .put('/api/incidents/update-streetname' + incident_id)
        .send(updatedStreetName)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  put /incidents/update-video:id
    xit('updates the video url in incident event', () => {
      const updatedVideoUrl = {
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      };

      request(server)
        .put('/api/incidents/update-video' + incident_id)
        .send(updatedVideoUrl)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    xit('updates the image url in incident event', () => {
      const updatedImageUrl = {
        imgUrl:
          'https://upload.wikimedia.org/wikipedia/commons/8/8d/Frog_on_palm_frond.jpg',
      };

      request(server)
        .put('/api/incidents/update-image' + incident_id)
        .send(updatedImageUrl)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    xit('updates the details in incident event', () => {
      const updatedDetails = {
        details: 'Updated Details Text',
      };

      request(server)
        .put('/api/incidents/update-details' + incident_id)
        .send(updatedDetails)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    xit('deletes the incident event', () => {});
  });

  xdescribe('/signup', () => {
    //  post /signup
    it('adds a new user', async () => {
      const newUser = {
        name: 'testuser',
        password: '123',
      };

      const createdUser = await request(server)
        .post('/api/signup')
        .send(newUser)
        .expect('Content-Type', /application\/json/);

      const queryString = `SELECT * FROM "public".user WHERE name='testuser'`;
      const findUser = await db.query(queryString);

      expect(findUser.name).toEqual(newUser.name);
      await bcrypt.compare(newUser.password, findUser.password, (err, ok) => {
        expect(ok).not.toEqual(null);
      });
    });
  });

  //  delete /incidents/remove-incident
  //  put /users/update-username
  //  put /users/update-pw
});
