function skillsMember() {
  // Path: member.js
  if (Meteor.isClient) {
    // Path: member.js
    Template.member.helpers({
      // Path: member.js
      skills: function() {
        // Path: member.js
        return Skills.find();
      }
    });
  }
}