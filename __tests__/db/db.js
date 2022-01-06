const db = require('../../server/database');
const request = require('supertest');
const { doesNotMatch } = require('assert');
const bcrypt = require('bcrypt');

const server = 'http://localhost:3000';

describe('Route Integration Tests', () => {
  //Test EndPoints
  //  get /users

  xdescribe('/users', () => {
    let user_id;
    it('returns existing users', () => {
      return request(server)
        .get('/api/users')
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('adds a new user', async () => {
      const newUser = {
        name: 'testuser',
        password: '123',
      };

      user_id = await request(server)
        .post('/api/signup')
        .send(newUser)
        .expect('Content-Type', /application\/json/)
        .expect(201)
        .then((res) => res.body.user_id);
    });

    //  put /users/update-username
    it('updates existing username', () => {
      const updatedUsername = 'cat';
      return request(server)
        .put('/api/users/update-username' + user_id)
        .send(updatedUsername)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  put /users/update-pw
    it('updates existing user password', async () => {
      const updatedPW = '345';
      const hashedPassword = await bcrypt.hash(updatedPW, 10, (err, hash) => {
        return hash;
      });
      return request(server)
        .put('/api/users/update-pw' + user_id)
        .send(hashedPassword)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('deletes the user', () => {
      return request(server)
        .delete('/api/users/remove-user' + user_id)
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

  xdescribe('/post', () => {
    let incident_id;

    it('adds an incident event', async () => {
      const incident_entry = {
        title: 'Route Testing Entry',
        street_name: '237 Arnold Drive Staten Island, NY 10314, United States',
        video_url: '',
        image_url: '',
        details: 'Test Details',
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

      return request(server)
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

      return request(server)
        .put('/api/incidents/update-streetname' + incident_id)
        .send(updatedStreetName)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  put /incidents/update-video:id
    it('updates the video url in incident event', () => {
      const updatedVideoUrl = {
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
      };

      return request(server)
        .put('/api/incidents/update-video' + incident_id)
        .send(updatedVideoUrl)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('updates the image url in incident event', () => {
      const updatedImageUrl = {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/8/8d/Frog_on_palm_frond.jpg',
      };

      return request(server)
        .put('/api/incidents/update-image' + incident_id)
        .send(updatedImageUrl)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    it('updates the details in incident event', () => {
      const updatedDetails = {
        details: 'Updated Details Text',
      };

      return request(server)
        .put('/api/incidents/update-details' + incident_id)
        .send(updatedDetails)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });

    //  delete /incidents/remove-incident
    it('deletes the incident event', () => {
      return request(server)
        .delete('/api/incidents/remove-incident' + incident_id)
        .expect('Content-Type', /application\/json/)
        .expect(200);
    });
  });
});
