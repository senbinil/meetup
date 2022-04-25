import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Browse for React meetups !" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://logger:logger23206@cluster0.dfjfn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const data = await meetupsCollection.find().toArray();
  return {
    props: {
      meetups: data.map((meet) => ({
        id: meet._id.toString(),
        title: meet.data.title,
        address: meet.data.address,
        image: meet.data.image,
        description: meet.data.description,
      })),
    },
    revalidate: 1,
  };
  client.close();
}

export default HomePage;
