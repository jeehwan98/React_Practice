import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {

    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of highly active React meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

export async function getStaticProps() {
    // fetch data from an API

    // 1. connect
    const client = await MongoClient.connect('mongodb+srv://jeehwan98:rlawlghks123@cluster0.juh75on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db('meetups');

    const meetupsCollection = db.collection('meetups');

    // 2. find
    const meetups = await meetupsCollection.find().toArray(); // find all the documents

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                // description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

// export async function getServerSideProps(context) {
//     const req = context.req; // request
//     const res = context.res; // response
//     // fetch data from API
//     return {
//         props: DUMMY_MEETUPS
//     }
// }

export default HomePage;