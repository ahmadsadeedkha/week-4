const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function page() {
  await sleep(1000); // Triggers loading.tsx for 1 second on route change
  return <div>Dashboard Page</div>;
}
