import { Certification } from '@/types';

export const certifications: Certification[] = [
  {
    id: 'topcit',
    title: 'TOPCIT',
    issuer: 'IITP / DICT',
    description: 'Competency Certificate (Level 2) in Test of Practical Competency in ICT & Software Engineering.',
    image: '/images/topcit.png'
  },
  {
    id: 'cisco1',
    title: 'Cisco CCNA 1',
    issuer: 'Cisco Networking Academy',
    description: 'Introduction to Networks: IPv4/IPv6 addressing, OSI model, Ethernet protocols, and switch configuration.',
    image: '/images/cisco1.png'
  },
  {
    id: 'cisco2',
    title: 'Cisco CCNA 2',
    issuer: 'Cisco Networking Academy',
    description: 'Switching, Routing, and Wireless Essentials: VLANs, Inter-VLAN routing, STP, EtherChannel, and DHCP.',
    image: '/images/cisco2.png'
  },
  {
    id: 'cisco3',
    title: 'Cisco CCNA 3',
    issuer: 'Cisco Networking Academy',
    description: 'Enterprise Networking, Security, & Automation: OSPF, ACLs, NAT, WAN concepts, and network virtualization.',
    image: '/images/cisco3.png'
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    issuer: 'Cisco Academy',
    description: 'Threats, Vulnerabilities, and Defensive Measures: Cryptography, secure authentication, and endpoint defense.',
    image: '/images/cyber.png'
  },
  {
    id: 'dict',
    title: 'DICT UI/UX',
    issuer: 'Dept. of ICT',
    description: 'Principles of User Interface and Web Experience Design: Semantic hierarchy, accessibility, and visual balance.',
    image: '/images/certificate1.png'
  }
];
