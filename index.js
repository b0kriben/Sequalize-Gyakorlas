const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const Student = require('./models/student');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Students tábla sikeresen létrehozva.');
    
    const students = await Student.bulkCreate([
      { name: 'János', favorite_class: 'Math', school_year: 1, has_language_examination: false },
      { name: 'Maris', favorite_class: 'Computer Science', school_year: 2, has_language_examination: true },
      { name: 'Benedek', favorite_class: 'History', school_year: 3, has_language_examination: false },
      { name: 'László', favorite_class: 'Math', school_year: 4,has_language_examination: true  },
      { name: 'Éva', favorite_class: 'PE', school_year: 1, has_language_examination: false }
    ]);
    console.log('Adatok sikeresen hozzáadva:', students);

    const studentsQuery = await Student.findAll({
      attributes: ['name'],
      where: {
        [Sequelize.Op.or]: [
          { favorite_class: 'Computer Science' },
          { has_language_examination: true }
        ]
      }
    });
    console.log('Diákok nevei:', studentsQuery.map(student => student.name));

    const studentCounts = await Student.findAll({
      attributes: [
        'school_year',
        [Sequelize.fn('COUNT', Sequelize.col('student_id')), 'num_students']
      ],
      group: ['school_year']
    });
    studentCounts.forEach(count => {
      console.log(`Évfolyam: ${count.school_year}, Tanulók száma: ${count.get('num_students')}`);
    });

  } catch (error) {
    console.error('Hiba történt:', error);
  }
})();