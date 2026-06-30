exports.handler = async function (event) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyn5PE7PgLcAUvzMqvkM6pDY3sRrWH7wjKO7gY1E-Vld5qCL_wIzmCUoht1b3BCZAVD/exec";
  try {
    await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body
    });
  } catch (e) {
    console.error("forward error:", e);
  }
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true })
  };
};
