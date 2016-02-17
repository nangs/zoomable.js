/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 * 					https://github.com/irlnathan/activityoverlord20/blob/master/api/controllers/PageController.js
 */

module.exports = {

	showHomePage: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      //return res.view('homepage');
      return res.view('homepage', {
        me: [],
        video: []
      });
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        //return res.view('homepage');
        return res.view('homepage', {
          me: [],
          video: []
        });
      }

      return res.view('dashboard', {
        me: user,
        video: []
      });

    });
  },

	showEditPage: function (req, res) {

    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('homepage');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: [],
          video: []
        });
      }

			// retreive the video object using the id
      Video.findOne(req.param('id'), function(err, video){
        if (err) {
          // return error
        }

        // if successful, return user and video object to frontend
        return res.view('edit', {
          me: user,
          video: video
        });

      });
    });
  }

};