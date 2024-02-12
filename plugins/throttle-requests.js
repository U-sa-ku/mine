export default function ({ $axios }) {
  let lastRequestTime = null;
  const MIN_REQUEST_INTERVAL = 1000; // 1秒ごとにリクエストを送信

  $axios.onRequest(config => {
    const now = Date.now();
    if (lastRequestTime && now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - (now - lastRequestTime);
      return new Promise(resolve => setTimeout(() => resolve(config), waitTime));
    }
    lastRequestTime = now;
    return config;
  });
}