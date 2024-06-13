let express = require("express");

let services = require("../services/pd_services");

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await services.get(req.body);
    res.send(result);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const result = await services.post(req.body);
    res.send(result);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const result = await services.patch(req.params.id, req.body);
    res.send(result);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await services.del(req.params.id);
    res.send(result);
  } catch (err) {
    res.send({ error: err.message });
  }
});

module.exports = router;
