import { Image } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import {Link} from 'react-router-dom';

interface ExchangeItemProps {
    location: string,
    capacity: number,
    organiser: string,
    time: string,
    participants: string,
}

const ExchangeItem = (props: ExchangeItemProps) => (
        <Link to={props.location} className='exchange-item'>
            <Image
                radius="md"
                h={100}
                w="auto"
                fit="contain"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                />
            <div style={{margin: '0px 8px'}}>
                <h4 style={{margin: '8px 0px'}}>{props.location}</h4>
                <div>{props.capacity}</div>
                <div>{props.organiser}</div>
            </div>
            <div style={{ marginLeft: 'auto'}}>
                <div>{props.time}</div>
                <div style={{display: 'flex'}}>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                    <div>{props.participants} / {props.capacity}</div>
                </div>
            </div>
        </Link>
);

export default ExchangeItem