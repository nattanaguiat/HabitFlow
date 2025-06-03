import Entry from "../models/Entry.model.js";
import Habit from "../models/Habit.model.js";

export const createEntry = async (req, res) => {
  const { habitId, date, completed } = req.body;

  try {
    const habit = await Habit.findOne({ _id: habitId, user: req.user.id });

    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const existingEntry = await Entry.findOne({ habit: habitId, date });
    if (existingEntry) {
      existingEntry.completed = completed;
      await existingEntry.save();
      return res.json(existingEntry);
    }

    const newEntry = new Entry({ habit: habitId, date, completed });
    await newEntry.save(res.status(201).json(newEntry));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getEntriesByHabit = async (req, res) => {
  const { habitId } = req.params;

  try {
    const habit = await Habit.findOne({ _id: habitId, user: req.user.id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const entries = await Entry.find({ habit: habitId }).sort({ date: 1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
