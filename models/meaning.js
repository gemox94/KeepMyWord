'use strict';
module.exports = function(sequelize, DataTypes) {
  var Meaning = sequelize.define('Meaning', {
    meaning: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Meaning.belongsToMany(models.User, {through: 'word_meaning'});
      }
    }
  });
  return Meaning;
};
