import MeetUpDetail from '@/components/meetups/MeetUpDetail';
import { useRouter } from 'next/router';

function MeetupDetails(props) {
    const router = useRouter();
    console.log(router.query.meetupId);
    return (
        <MeetUpDetail
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
            title='First Meetup'
            address='Some Street 5, Some City'
            description='This is a first meetup'
        />
    )
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                },
            },
        ],
    }
}

export async function getStaticProps(context) {
    // fetch data from API
    const meetupId = context.params.meetupId;

    console.log('meetupId: ', meetupId);

    return {
        props: {
            meetupData: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
                id: meetupId,
                title: 'First Meetup',
                address: 'Some Street 5, Some City',
                description: 'This is a first meetup'
            }
        }
    }
}

export default MeetupDetails;