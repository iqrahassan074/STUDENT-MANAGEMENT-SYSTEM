import inquirer from 'inquirer';

interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

const students: Student[] = [];
let nextId = 1;

async function mainMenu() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Add Student', 'View Students', 'Delete Student', 'Exit'],
  });

  switch (answer.action) {
    case 'Add Student':
      await addStudent();
      break;
    case 'View Students':
      viewStudents();
      break;
    case 'Delete Student':
      await deleteStudent();
      break;
    case 'Exit':
      console.log('Goodbye!');
      return;
  }

  await mainMenu();
}

async function addStudent() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Student name:',
    },
    {
      type: 'number',
      name: 'age',
      message: 'Student age:',
    },
    {
      type: 'input',
      name: 'grade',
      message: 'Student grade:',
    },
  ]);

  const student: Student = {
    id: nextId++,
    name: answers.name,
    age: answers.age,
    grade: answers.grade,
  };

  students.push(student);
  console.log(`Added student: ${student.name}`);
}

function viewStudents() {
  if (students.length === 0) {
    console.log('No students found.');
  } else {
    console.table(students);
  }
}

async function deleteStudent() {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: 'Enter the student ID to delete:',
  });

  const id = parseInt(answer.id, 10);
  const index = students.findIndex(student => student.id === id);

  if (index === -1) {
    console.log('Student not found.');
  } else {
    const deletedStudent = students.splice(index, 1)[0];
    console.log(`Deleted student: ${deletedStudent.name}`);
  }
}

mainMenu();
