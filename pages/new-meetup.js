import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";
const NewMeetupPage = () => {
  const router = useRouter();
  const meetHandler = async (data) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add Meetups</title>
        <meta title="description" content="Add new React Meetups!" />
      </Head>
      <NewMeetupForm onAddMeetup={meetHandler} />
    </>
  );
};

export default NewMeetupPage;
