import React from 'react';
import { SvgXml } from 'react-native-svg';

export default function SvgComponent() {
  const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="50" width="50">
  <title>Pawn</title>
  <description>
    Western white-side Pawn
  </description>

  <g>
    <path stroke-linejoin="miter" d="m25,1.1719c-3.4531,0-6.25,2.7969-6.25,6.25,0,1.3906,0.45312,2.6719,1.2188,3.7188-3.0469,1.75-5.125,5.0156-5.125,8.7812,0,3.1719,1.4688,6,3.7656,7.8594-4.688,1.657-11.579,8.672-11.579,21.047h35.938c0-12.375-6.8906-19.391-11.578-21.047,2.2969-1.8594,3.7656-4.6875,3.7656-7.8594,0-3.7656-2.0781-7.0312-5.125-8.7812,0.765-1.047,1.218-2.3285,1.218-3.7191,0-3.4531-2.7969-6.25-6.25-6.25z" fill-rule="nonzero" stroke="#000" stroke-linecap="round" stroke-miterlimit="4" stroke-dasharray="none" stroke-width="2.34375" fill="#FFF"/>
  </g>
</svg>
`;

  const SvgImage = () => <SvgXml xml={svgMarkup} />;

  return <SvgImage />;
}
