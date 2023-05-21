/* eslint-disable */ 
/* @ts-nocheck */

import React, { useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import "../external/leaflet/leaflet.css";


const L = require("../external/leaflet/leaflet");



interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {


  useEffect(() => {

    const  map = L.map('map').setView([51.505, -0.09], 13);



    // icons

    const svgIcon = L.divIcon({
      html: `
    <svg
      width="24"
      height="40"
      viewBox="0 0 100 100"
      version="1.1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L50 100 L100 0 Z" fill="#7A8BE7"></path>
    </svg>`,
      className: "",
      iconSize: [24, 40],
      iconAnchor: [12, 40],
    });


    map.on("load",function() { setTimeout(() => {
      map.invalidateSize();
    }, 1); });

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {}).addTo(map);


    const marker = L.marker([0, 0], { icon: svgIcon }).addTo(map);
    marker.on('click', function(){ 
      window.open('https://google.com', '_blank');
    });

  }, [])

  return (
    <div id='map' style={{height: "100vh", width: '100%'}}>
      hello world
    </div>
  );
};
