exports.handler = async function (event) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyn5PE7PgLcAUvzMqvkM6pDY3sRrWH7wjKO7gY1E-Vld5qCL_wIzmCUoht1b3BCZAVD/exec";

  const forwardToGAS = fetch(GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: event.body
  }).catch((e) => console.error("forward error:", e));

  // รอ Apps Script ได้สูงสุด 8 วินาที ถ้ายังไม่เสร็จก็ตอบ LINE ไปก่อนเลย
  const timeout = new Promise((resolve) => setTimeout(resolve, 8000));
  await Promise.race([forwardToGAS, timeout]);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true })
  };
};
