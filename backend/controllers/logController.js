import ActionLog from "../models/ActionLog.js"; 

export const getLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("user", "fullName"); 

    res.json(logs);
  } catch (err) {
    console.error(" Failed to fetch logs:", err.message);
    res.status(500).json({ message: "Failed to load activity logs" });
  }
};
