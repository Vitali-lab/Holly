export const postN8n = async (complitedOrder) => {
  await fetch(
    "http://localhost:5678/webhook-test/f8bfe877-2ef3-4582-843a-ce3df7069f7f",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complitedOrder,
      }),
    },
  );
};

// test https://5859225-ze277454.twc1.net/webhook-test/ff699e49-54bd-4551-ae99-942dc31d18c5
// prod https://5859225-ze277454.twc1.net/webhook/ff699e49-54bd-4551-ae99-942dc31d18c5
