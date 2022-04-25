import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
const MeetDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://logger:logger23206@cluster0.dfjfn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meet) => ({
      params: { meetId: meet._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetId;
  const client = await MongoClient.connect(
    "mongodb+srv://logger:logger23206@cluster0.dfjfn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeet = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  return {
    props: {
      meetupData: {
        id: selectedMeet._id.toString(),
        title: selectedMeet.data.title,
        address: selectedMeet.data.address,
        image: selectedMeet.data.image,
        description: selectedMeet.data.description,
      },
    },
  };
}
export default MeetDetails;
