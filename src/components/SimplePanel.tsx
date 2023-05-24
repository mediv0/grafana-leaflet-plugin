/* eslint-disable */ 
/* @ts-nocheck */

import React, { useEffect } from 'react';
import { PanelProps, Vector } from '@grafana/data';
import { SimpleOptions } from 'types';
import "../external/leaflet/leaflet.css";


const L = require("../external/leaflet/leaflet");

let map: any;


interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {

  useEffect(() => {



  const query: {
    [name: string]: Vector<any>[]
  } = {};


  if(data.series.length) {
    const fields = data.series[0].fields;
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const fieldName = field.name;
      const values = field.values as any
      
      query[fieldName] = values;
    }
  }
  
  
  
  let container = L.DomUtil.get('map');
  if(map) {
    console.log("inside map");
    const container_map_elem = document.getElementById('map') as HTMLDivElement;
    container_map_elem.innerHTML = ""
    map.remove();
    map.invalidateSize();
  }


  if(container != null){
    container._leaflet_id = null;
    }

    map = L.map('map').setView([51.505, -0.09], 13);

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

    // length of query results for each field
    if(Object.keys(query).length > 0) {

      const length = query.lat.length

      
      
      for(let i = 0 ; i < length; i++) {
        const lat = (query.lat as any).get(i);
        const lng = (query.lng as any).get(i);
        const link = (query.link as any).get(i);

        L.marker([lat, lng], { icon: svgIcon }).on('click', function(){ 
          window.open(link, '_blank');
        }).addTo(map);
      }

    }

    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 500);

  })

  return (
    <div id='map' style={{height: "100%", width: '100%'}}>
    </div>
  );
};
