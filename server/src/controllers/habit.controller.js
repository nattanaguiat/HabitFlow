import User from "../models/User.model";
import Habit from "../models/Habit.model.js";

// Create a new habit
export const createHabit = async (req, res) => {
  const { name, description, frequency, category } = req.body;

  if (!name || !frequency || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newHabit = new Habit({
      userId: req.userId,
      name,
      description,
      frequency,
      category,
    });

    const savedHabit = await newHabit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating habit" });
  }
};

// Get all habits for a user
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.status(200).json(habits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding habits" });
  }
};

// Get a single habit by ID
export const getHabitById = async (req, res) => {
  const { id } = req.params;

  try {
    const habit = await Habit.findById(id);
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json(habit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error finding habit" });
  }
};
// Update a habit
export const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description, frequency, category } = req.body;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating habit" });
  }
};

// Delete a habit
export const deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHabit = await Habit.findByIdAndDelete(id);

    if (!deletedHabit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.status(200).json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting habit" });
  }
};
