'use strict';
module.exports = function(sequelize, DataTypes) {
  var Word = sequelize.define('Word', {
    word: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.Word.belongsToMany(models.User, {through: 'word_meaning'});
        models.Word.hasMany(models.Meaning);
      }
    }
  });
  return Word;
};
