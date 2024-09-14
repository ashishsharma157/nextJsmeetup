import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
function NewMeetUpPage() {
  const router = useRouter();
  async function addMeetupHandler(enterMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>React learn meetup form</title>
        <meta
          name="description"
          content="this is test for new learning add form"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetUpPage;
