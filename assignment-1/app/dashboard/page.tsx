const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function page() {
  // Uncomment below line to test the error UI (forcing an error renders error.tsx)
  // throw new Error("Failed to load about data!"); // written just for testing purpose
  await sleep(1000); // Triggers loading.tsx for 1 second on route change
  return <div>Dashboard Page</div>;
}
