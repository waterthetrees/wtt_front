import React, { Component, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import "./Treemap.scss";

import { postTreeStatus } from "../../actions/index.js";

export function Tree({ tree, today, modal, toggle, lat, lng }) {
  const {
    label,
    icon,
    commonname,
    treetag,
    plant_date,
    owner,
    buttonLabel,
    className,
  } = tree;

  const { progressNumber, dateWateredFormatted } = treeProgress(tree, today);

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
    setWaterDate(moment().format("ddd, MMM Do YYYY"));
    setMedal(!getmedal);
  };
  const changeStatus = (event) => setStatus(event.target.name);

  const onCheckboxBtnClick = (selected) => {
    const index = statusSelected.indexOf(selected);
    if (index < 0) {
      statusSelected.push(selected);
    } else {
      statusSelected.splice(index, 1);
    }
    setStatusSelected([...statusSelected]);
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
  return (
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>
        {label}
        {treetag}
        {getmedal && (
          <img
            className="Tree__icon"
            src="assets/images/trees/medal.svg"
            height="50px"
          />
        )}
        <div className="flex-grid-three text-left">
          <div>
            <h3>{tree.commonname}</h3>
          </div>
          <div>
            <h4>{tree.botanicalname}</h4>
          </div>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="flex-grid-thirds tree__col status">
          <div>
            <img src="assets/images/trees/dead.svg" />
          </div>
          <div className="progressbar" max="100" value={progressNumber}></div>
          <div>
            <img src="assets/images/trees/happy.svg" />
          </div>
        </div>

        <div className="flex-grid tree__col  tree__col text-center">
          {statusSelected.length > 0 && (
            <span>
              <h5>
                status:{" "}
                {statusSelected.length > 0 ? statusSelected.join(", ") : "good"}{" "}
              </h5>
            </span>
          )}
          {issuesSelected.length > 0 && (
            <span>
              <h5>
                issues:{" "}
                {issuesSelected.length > 0
                  ? issuesSelected.join(", ")
                  : "healthy"}{" "}
              </h5>
            </span>
          )}
          {tree.dbh && <h5>DBH: {tree.dbh}</h5>}
          {tree.height && <h5>Height: {tree.height}</h5>}
        </div>

        <div className="flex-grid tree_history-list border-top">
          <h5>Maintanence</h5>
        </div>
        <div className="flex-grid-buttons tree__status  ">
          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="success"
              onClick={() => {
                onCheckboxBtnClick("watered");
                addWater("watered");
              }}
              active={statusSelected.includes("watered")}
            >
              <img name="addWater" src="assets/images/trees/water.svg" />
            </Button>
            <p>add water</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="success"
              onClick={() => onCheckboxBtnClick("weeded")}
              active={statusSelected.includes("weeded")}
            >
              <img src="assets/images/trees/weed.svg" />
            </Button>{" "}
            <p>weed</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="success"
              onClick={() => onCheckboxBtnClick("mulch")}
              active={statusSelected.includes("mulch")}
            >
              <img src="assets/images/trees/mulch.svg" />
            </Button>{" "}
            <p>mulch</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="success"
              onClick={() => onCheckboxBtnClick("prune")}
              active={statusSelected.includes("prune")}
            >
              <img name="addWater" src="assets/images/trees/prune.svg" />
            </Button>
            <p>prune</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="success"
              onClick={() => onCheckboxBtnClick("stakes")}
              active={statusSelected.includes("stakes")}
            >
              <img src="assets/images/trees/stakes.svg" />
            </Button>{" "}
            <p>add stakes</p>
          </div>
        </div>

        <div className="flex-grid tree_history-list border-top">
          <h5>Issues</h5>
        </div>
        <div className="flex-grid-buttons tree__status  ">
          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="danger"
              onClick={() => onIssuesClick("insects")}
              active={issuesSelected.includes("insects")}
            >
              <img src="assets/images/trees/insect.svg" />
            </Button>{" "}
            <p>has insects</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="danger"
              onClick={() => onIssuesClick("broken")}
              active={issuesSelected.includes("broken")}
            >
              <img src="assets/images/trees/broken.svg" />
            </Button>{" "}
            <p>broken branch</p>
          </div>

          <div className="text-center">
            <Button
              className="tree__status-btn"
              color="danger"
              onClick={() => onIssuesClick("electric lines")}
              active={issuesSelected.includes("electric lines")}
            >
              <img src="assets/images/trees/electric.svg" />
            </Button>{" "}
            <p>electric lines</p>
          </div>
        </div>

        <a href={tree.selectreelink}>
          <img className={tree__imageclass} src={image} />
        </a>

        <div className="flex-grid tree_history-list border-top">
          <h5>History</h5>
        </div>
        {dateWatered && (
          <div className="flex-grid tree__indent tree_history-list">
            <h4>Vivien watered the tree {dateWatered}</h4>
          </div>
        )}
      </ModalBody>
      <ModalBody></ModalBody>
      <ModalFooter>
        <div className="flex-grid tree__col  tree__col text-center">
          <div>
            <h4>{tree.owner}</h4>
          </div>
          <div>
            <h5>
              {tree.address} {tree.street}
            </h5>
          </div>
          <div>
            <h5>
              {tree.treecity} {tree.treecountry}
            </h5>
          </div>
          <div>
            <h5>{tree.plantingdistrict}</h5>
          </div>
          <div>
            <h5>Lat/Lng: </h5>
          </div>
          <div>
            <h5>
              [{tree.latitude},{tree.longitude}]
            </h5>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}

//   address: "1524"
// botanicalname: " Acer rubrum October Glory"
// commonname: " MAPLE OCTOBER GLORY"
// dbh: " 0-6"
// height: null
// inventoryid: 6952496
// latitude: 37.774435327469
// longitude: -122.28793892517
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

function treeProgress(tree, today) {
  const dateWateredFormatted = moment(tree.dateWatered).format("MMM Do YYYY");
  const daysSinceLastWatered = moment(today).diff(tree.dateWatered, "days");
  const progressNumber =
    daysSinceLastWatered < 7
      ? 100
      : daysSinceLastWatered >= 7 && daysSinceLastWatered < 14
      ? 80
      : daysSinceLastWatered >= 14 && daysSinceLastWatered < 21
      ? 60
      : daysSinceLastWatered >= 21 && daysSinceLastWatered < 28
      ? 40
      : daysSinceLastWatered >= 28 && daysSinceLastWatered < 35
      ? 20
      : 0;
  return { progressNumber, dateWateredFormatted };
}
