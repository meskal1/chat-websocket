const randomImages = [
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1438761681033-6461ffad8d80.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1463453091185-61582044d556.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1476900966873-ab290e38e3f7.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1502378735452-bc7d86632805.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1502937406922-305bb2789e95.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1503467913725-8484b65b0715.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1506089676908-3592f7389d4d.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1507003211169-0a1dd7228f2d.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1517202383675-eb0a6e27775f.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1519345182560-3f2917c472ef.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1531251445707-1f000e1e87d0.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1541271696563-3be2f555fc4e.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1542345812-d98b5cd6cf98.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1546456073-6712f79251bb.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1546539782-6fc531453083.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1546623381-d6d69cd69955.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1546967191-fdfb13ed6b1e.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1548946526-f69e2424cf45.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1549351236-caca0f174515.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1551069613-1904dbdcda11.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1552058544-f2b08422138a.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1554384645-13eab165c24b.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1569443693539-175ea9f007e8.jpeg?raw=true',
  'https://github.com/meskal1/simple-chat/blob/7a07b8cab51d59b73648847dcb1bb918fb33827e/src/assets/userImages/photo-1573140247632-f8fd74997d5c.jpeg?raw=true',
]

export const getRandomImage = () => {
  const index = Math.floor(Math.random() * 24)
  const randomImage = randomImages[index]

  return randomImage
}
