import React, { Component, useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
import useSWR from "swr";
import {
  Button,
  ButtonToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  ButtonGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";
import moment from "moment";
import cx from "classnames";
import "./Mapper.scss";
import CustomizedSlider from "./Slider.js";

import { postTreeStatus } from "../../actions/index.js";

export const serializeData = (data) => {
  // console.log(data,'serializeData');
  return Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");
};

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((body_string) => JSON.parse(body_string))
    .then((body) => {
      console.log("FETCHER!!!!! \n\n\n\n\n", body);
      return body.data;
    });

export function TreeData({ currentTree, iconCurrent, showTree, setShowTree }) {
  console.log("TreeData currentTree", currentTree);
  const { lat, lng } = currentTree || {};
  console.log("TreeData tree {lat,lng}", { lat, lng });
  const request = {
    requestType: "GetTree",
    lat,
    lng,
  };
  console.log("TreeData tree request", request);
  const dataSerialized = serializeData(request);
  const BASE_URL = "http://localhost:3002/treemap";
  const URL = `${BASE_URL}?${dataSerialized}`;
  const { data, error } = useSWR(URL, fetcher);
  console.log(data, "tree POST FETCH DDDDDDDATA \n\n\n\n");

  // const treeDataRef = useRef(null); // DOM element to render map
  const [tree, setTree] = useState(null);
  // Initialize our map
  useEffect(() => {
    if (!data) return;
    // console.log('data here' ,data)
    setTree(data);
  }, [data]);

  // tree = JSON.parse(tree);
  const {
    label,
    icon,
    common,
    health,
    treetag,
    plant_date,
    owner,
    buttonLabel,
    className,
  } = tree || {};
  console.log("tree", tree, common, "asdfasdfasdfasdf\n\n\n");
  // {"inventoryid","common","botanicalname",
  // "lng":-122.27753419780001,"lat":37.776214375251996,
  // "plantingdistrict":" Lincoln Tilden Marshall Pacific ",
  // "address":"640",
  // "street":" PACIFIC AV","sidetype":" Front","tree":1,"treecity":null,
  // "treestate":null,"treecountry":null,"treezip":null,"treewaterlevel":100,
  // "treehealth":null,"treeinsects":null,"treebroken":null,
  // "selectreelink":"https://selectree.calpoly.edu/tree-detail/lophostemon-confertus",
  // "dbh":" 13-18","height":null,"owner":" Public","pictureurl":"None"}

  // const {progressNumber, dateWateredFormatted} = treeProgress(tree, today);

  const [dateWatered, setWaterDate] = useState(dateWateredFormatted);
  const [waterSelected, setWaterSelected] = useState();
  const [healthy, setHealthy] = useState("healthy");
  const [statusSelected, setStatusSelected] = useState([]);
  const [issuesSelected, setIssuesSelected] = useState([]);
  const [moreSelected, setMoreSelected] = useState(false);

  const [getmedal, setMedal] = useState(false);

  // const [watered, setWaterDate] = useState();
  const [status, setStatus] = useState("healthy");
  const changeLastWatered = () => {
    setWaterDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    setMedal(!getmedal);
  };
  const changeStatus = (event) => setStatus(event.target.name);
  const [watered, setWatered] = useState("water");
  const [weeded, setWeeded] = useState("weed");
  const [mulched, setMulched] = useState("mulch");
  const [staked, setStaked] = useState("stake");
  const [braced, setBraced] = useState("brace");
  const [pruned, setPruned] = useState("prune");

  const onCheckboxBtnClick = (selected) => {
    const index = statusSelected.indexOf(selected);
    if (index < 0) {
      statusSelected.push(selected);
    } else {
      statusSelected.splice(index, 1);
    }
    setStatusSelected([...statusSelected]);
    statusSelected.includes("watered")
      ? setWatered("watered")
      : setWatered("water");
    statusSelected.includes("weeded") ? setWeeded("weeded") : setWeeded("weed");
    statusSelected.includes("mulched")
      ? setMulched("mulched")
      : setMulched("mulch");
    statusSelected.includes("staked")
      ? setStaked("staked")
      : setStaked("stake");
    statusSelected.includes("braced")
      ? setBraced("braced")
      : setBraced("brace");
    statusSelected.includes("pruned")
      ? setPruned("pruned")
      : setPruned("prune");

    statusSelected.length > 0 ? setHealthy(null) : setHealthy("healthy");
  };

  const onMoreClick = () => setMoreSelected(!moreSelected);
  const onIssuesClick = (selected) => {
    const index = issuesSelected.indexOf(selected);
    if (index < 0) {
      issuesSelected.push(selected);
    } else {
      issuesSelected.splice(index, 1);
    }
    setIssuesSelected([...issuesSelected]);
    issuesSelected.length > 0 ? setHealthy(null) : setHealthy("healthy");
  };

  const addWater = (selected) => {
    //console.log('selected',selected, waterSelected);
    waterSelected
      ? setWaterDate(moment().format("MMM Do YYYY"))
      : setWaterDate(dateWateredFormatted);
    setWaterSelected(!waterSelected);
    setMedal(!getmedal);
  };

  const dispatch = useDispatch();
  const saved = (event) =>
    dispatch(
      postTreeStatus({
        treeId,
        request: "savetree",
        status,
        dateWatered,
        treetag,
      })
    );
  // const image = <img className='tree__image' src='assets/images/trees/Koelreuteria-paniculata-Maja-Dumat-600x400.jpg'/>
  //<div className="flex-grid border-top tree__imagelocation">
  //<img className='tree__image' src='assets/images/trees/Koelreuteria-paniculata-Maja-Dumat-600x400.jpg'/>
  // </div>
  const image =
    tree.pictureurl === "None" || tree.pictureurl === undefined
      ? icon
      : tree.pictureurl;
  const tree__imageclass =
    tree.pictureurl === "None" || tree.pictureurl === undefined
      ? "tree__icon"
      : "tree__image";
  // {getmedal && <img className='Tree__icon' src='assets/images/trees/medal.svg' height="50px"/>}
  console.log("image", image, tree__imageclass);

  const notesRef = useRef("test notes");

  const handleSubmit = async (event, send_data) => {
    const functionName = "handleSubmit";
    try {
      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };
  const [value, setValue] = useState("");
  const valueRef = useRef();

  const handleClick = (e) => {};

  const [volunteerValue, setVolunteerValue] = useState("");
  const volunteerRef = useRef("Volunteer");
  const handleVolunteer = (e) => setVolunteerValue(volunteerRef.current.value);
  const [commentValue, setCommentValue] = useState("");
  const commentRef = useRef("Volunteer");
  const handleComment = (e) => setVolunteerValue(commentRef.current.value);
  const toggle = () => setShowTree(!showTree);
  useEffect(() => {}, []);

  const defaultSliderValue = {
    good: 100,
    fair: 79,
    poor: 59,
    dead: 20,
    missing: 0,
  };

  const [sliderValue, setSlider] = useState(defaultSliderValue.health || 100);
  const [overallHealth, setOverallHealth] = useState(health || "good");

  console.log(
    "overallHealth",
    overallHealth,
    defaultSliderValue,
    "health",
    health
  );

  // const [sliderValue, setSlider] = useState(100);
  // const [overallHealth, setOverallHealth] = useState('GOOD');
  const changeSlider = (event) => {
    const value = event.target.value;
    if (value >= 80) setOverallHealth("good");
    if (value >= 60 && value <= 79) setOverallHealth("fair");
    if (value >= 40 && value <= 59) setOverallHealth("poor");
    if (value >= 20 && value <= 39) setOverallHealth("dead");
    if (value <= 20) setOverallHealth("stump");
    setSlider(event.target.value);
  };

  return <div>test</div>;

  // return (

  // <Modal isOpen={showTree} toggle={toggle} className={className}>

  //   <ModalHeader toggle={toggle}>{label}
  //     {treetag}
  //     <div className="flex-grid-three text-left">
  //       {tree.common && <div><h3>{tree.common}</h3></div>}
  //       {tree.botanicalname && <div><h4>{tree.botanicalname}</h4></div>}
  //       <div><h4>{tree.age}</h4></div>
  //       {tree.age && <img src='assets/images/trees/age.svg' height="100px"/>}
  //       {image && <img src={`${image}`} height="200px"/>}
  //     </div>
  //   </ModalHeader>

  //   <ModalBody>
  //     <div className="flex-grid tree_history-list text-center"><h5>Overall Health</h5></div>
  //     <div className="flex-grid-buttons tree__status  ">
  //       <input type="range" min="0" max="100" value={sliderValue} onBlur={handleSubmit} className="slider" id="myRange" onChange={changeSlider}/>
  //       <h5><span id={sliderValue}>{overallHealth}</span></h5>
  //     </div>

  //     <div className="flex-grid border-top">
  //     <div className="text-center tree_history-list"><h5>Tree Visit Maintenance</h5></div>

  //     <div className="flex-grid-buttons tree__status  ">
  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('watered')} active={statusSelected.includes('watered')}  >
  //           <img src={`assets/images/trees/${watered}.svg`} />
  //           <p>{watered}</p>
  //         </Button>
  //       </div>

  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('mulched')} active={statusSelected.includes('mulched')}>
  //           <img src={`assets/images/trees/${mulched}.svg`} />
  //           <p>{mulched}</p>
  //         </Button>{' '}
  //       </div>

  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('weeded')} active={statusSelected.includes('weeded')}>
  //           <img src={`assets/images/trees/${weeded}.svg`} />
  //           <p>{weeded}</p>
  //         </Button>{' '}
  //       </div>

  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('staked')} active={statusSelected.includes('staked')}>
  //           <img src={`assets/images/trees/${staked}.svg`} />
  //           <p>{staked}</p>
  //         </Button>{' '}
  //       </div>

  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('braced')} active={statusSelected.includes('braced')}  >
  //           <img src={`assets/images/trees/${braced}.svg`} />
  //           <p>{braced}</p>
  //         </Button>
  //       </div>

  //       <div className="text-center">
  //         <Button className="tree__status-btn btn-sm" color="success" onClick={() => onCheckboxBtnClick('pruned')} active={statusSelected.includes('pruned')}  >
  //           <img src={`assets/images/trees/${pruned}.svg`} />
  //           <p>{pruned}</p>
  //         </Button>
  //       </div>
  //     </div>

  //     <div className="flex-grid tree__status">
  //       {(statusSelected.length > 0) && (
  //       <div className="flex-grid tree__indent">
  //         <span>
  //           Maintenance Done: {(statusSelected.length > 0) ? statusSelected.join(', ') : 'None Yet'}
  //         </span>
  //       </div>)}

  //       <div className="flex-grid tree__indent">
  //         Volunteer Name:
  //         <input ref={volunteerRef} placeholder="Volunteer" onBlur={handleVolunteer} className="volunteerName" id="volunteerName"/>
  //       </div>

  //       <div className="flex-grid tree__indent">
  //         Maintenance Comment:
  //         <input ref={commentRef} placeholder="Maintenance Comment" onBlur={handleComment} className="volunteerName" id="maintenanceComment"/>
  //       </div>

  //       <div className="flex-grid tree__indent">
  //         Tree Notes:
  //         <textarea rows="5" cols="80" ref={notesRef} placeholder="Tree Notes" className="notes" id="notes"/>
  //       </div>
  //       </div>
  //     </div>

  //     <a href={tree.selectreelink}><img className={tree__imageclass} src={image}/></a>

  //     <div className="flex-grid border-top">
  //     <div className="text-center tree_history-list"><h5>Tree Visit History</h5></div>
  //       {dateWatered && (
  //         <div className="flex-grid tree__indent">
  //           {dateWatered} tree visit by {volunteerValue}
  //         </div>)}
  //       {(statusSelected.length > 0) && (
  //         <div className="flex-grid tree__indent">
  //           <span>
  //             Maintenance Done: {(statusSelected.length > 0) ? statusSelected.join(', ') : 'None Yet'}
  //           </span>
  //         </div>)}
  //     </div>
  //     <div className="flex-grid border-top">
  //       <div className="tree_history-list text-left">
  //         <h5 className="text-center">Location</h5>

  //         <div>{tree.address} {tree.street}</div>
  //         <div>{tree.treecity} {tree.treecountry}</div>
  //         <div>Lat: {tree.lat}</div>
  //         <div>Lng: {tree.lng}</div>
  //         <div>{tree.plantingdistrict}</div>

  //       </div>
  //     </div>

  //     <div className="flex-grid border-top">
  //       <div className="tree_history-list text-left">
  //         <h5 className="text-center">More info</h5>
  //         Open Tree Standards
  //         <a href="https://standards.opencouncildata.org/#/trees">https://standards.opencouncildata.org/#/trees</a>

  //       </div>
  //     </div>
  //   </ModalBody>

  //   <ModalFooter>

  //   </ModalFooter>
  // </Modal>
  // )
}

//   address: "1524"
// botanicalname: " Acer rubrum October Glory"
// common: " MAPLE OCTOBER GLORY"
// dbh: " 0-6"
// height: null
// inventoryid: 6952496
// lat: 37.774435327469
// lng: -122.28793892517
// owner: " Public"
// pictureurl: "https://selectree.calpoly.edu/images/0100/00/original/acer-rubrum-tree-3.jpg"
// plantingdistrict: " West End"
// plantingopt1: " Cercis canadensis"
// plantingopt1com: " EASTERN REDBUD"
// plantingopt2: " Acer nigrum Green Column"
// plantingopt2com: " GREEN COLUMN MAPLE"
// selectreelink: "http://selectree.calpoly.edu/tree-detail/acer-rubrum"
// sidetype: " SIDE"
// street: " 3RD ST"
// tree: 1
// treebroken: null
// treecity: null
// treecountry: null
// treehealth: null
// treeinsects: null
// treename: null
// treestate: null
// treestatus: null
// treewaterlevel: 100
// treezip: null

// function treeProgress(tree, today) {
//   const dateWateredFormatted = moment(tree.dateWatered).format('MMM Do YYYY');
//   const daysSinceLastWatered = moment(today).diff(tree.dateWatered, 'days');
//   const progressNumber = (daysSinceLastWatered < 7) ? 100 :
//                (daysSinceLastWatered >= 7 && daysSinceLastWatered < 14) ? 80 :
//                (daysSinceLastWatered >= 14 && daysSinceLastWatered < 21) ? 60 :
//                (daysSinceLastWatered >= 21 && daysSinceLastWatered < 28) ? 40 :
//                (daysSinceLastWatered >= 28 && daysSinceLastWatered < 35) ? 20 : 0;
//   return {progressNumber, dateWateredFormatted};
// }
