import Employee from '../models/Employee.js'; // Assuming you have an Employee model defined

// Get salary distribution
export const getSalaryDistribution = async (req, res) => {
  try {
    // Group employees by position and calculate the average salary for each group
    const salaryDistribution = await Employee.aggregate([
      {
        $group: {
          _id: '$position',
          averageSalary: { $avg: '$salary' },
        },
      },
      {
        $project: {
          position: '$_id',
          averageSalary: 1,
          _id: 0,
        },
      },
    ]);
    res.json(salaryDistribution);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve salary distribution', error });
  }
};

// Get skills inventory
export const getSkillsInventory = async (req, res) => {
  try {
    // Unwind the skills array, group by skill name, and count the number of occurrences
    const skillsInventory = await Employee.aggregate([
      { $unwind: '$skills' },
      {
        $group: {
          _id: '$skills',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json(skillsInventory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve skills inventory', error });
  }
};

// Get employee demographics
export const getEmployeeDemographics = async (req, res) => {
  try {
    // Example of getting demographics by contract type
    const demographics = await Employee.aggregate([
      {
        $group: {
          _id: '$contractType',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json(demographics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve employee demographics', error });
  }
};
