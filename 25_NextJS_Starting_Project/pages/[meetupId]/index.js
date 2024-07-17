import { MongoClient, ObjectId } from 'mongodb';
import MeetUpDetail from '@/components/meetups/MeetUpDetail';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MeetupDetails(props) {
    console.log(props);

    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name='description'
                    content={props.meetupData.description}
                />
            </Head>
            <MeetUpDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {

    // connect
    const client = await MongoClient.connect('mongodb+srv://jeehwan98:rlawlghks123@cluster0.juh75on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('meetups');

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // find all

    client.close();

    return {
        // fallback: false, // we've only set this at build time and never thereafter
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } }))
    }
}

export async function getStaticProps(context) {
    // fetch data from API
    const meetupId = context.params.meetupId;

    // connect
    const client = await MongoClient.connect('mongodb+srv://jeehwan98:rlawlghks123@cluster0.juh75on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('meetups');

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;