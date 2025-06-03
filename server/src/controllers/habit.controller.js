import Habit from "../models/Habit.model.js";

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createHabit = async (req, res) => {
  const { title, frequency} = req.body;
  try {
    const newHabit = new Habit({
      user: req.user._id,
      title,
      frequency,
    });

    const savedHabit = await newHabit.save();
    res.json(savedHabit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ message: "Hbait not found" });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
