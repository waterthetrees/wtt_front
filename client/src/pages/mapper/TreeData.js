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

export const serializeData = (data) => {
  // console.log(data,'serializeData');
  return Object.entries(data)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");
};

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((body_string) => {
      console.log("body_string", body_string);
      return JSON.parse(body_string);
    });

export function TreeData({
  currentTreeId,
  iconCurrent,
  showTree,
  setShowTree,
}) {
  console.log("TreeData", currentTreeId, currentTreeId, "showTree", showTree);
  const URL = `http://localhost:3002/tree?currentTreeId=${currentTreeId}`;
  const URLHISTORY = `http://localhost:3002/treehistory?currentTreeId=${currentTreeId}`;
  const { data: tree } = useSWR(URL);
  const { data: treeHistory } = useSWR(URLHISTORY);
  // const treeDataRef = useRef(null); // DOM element to render map
  // const [treeInfo, setTreeInfo] = useState(null);
  // const [treeHistoryInfo, setTreeHistoryInfo] = useState(null);
  // Initialize our map
  useEffect(() => {
    if (!tree) return;
    console.log("data here useEffect", tree);
    // setTreeInfo(tree);
    // setTreeHistoryInfo(treeHistory);
  }, [tree, treeHistory]);

  console.log("tree", tree, "tree POST FETCH DDDDDDDATA treeInfo \n\n\n\n");
  console.log(
    "treeHistory",
    treeHistory,
    "tree POST FETCH DDDDDDDATA treeInfo \n\n\n\n"
  );
  // console.log('treeInfo', treeInfo, 'tree POST FETCH DDDDDDDATA treeInfo \n\n\n\n');
  const {
    id_tree,
    common,
    scientific,
    planted,
    health,
    address,
    city,
    country,
    neighborhood,
    lat,
    lng,
    owner,
    ref,
    who,
    notes,
  } = tree || {};

  const {
    id_treehistory,
    watered,
    mulched,
    weeded,
    staked,
    braced,
    pruned,
    datevisit,
    comment,
    volunteer,
  } = treeHistory || {};
  // const [waterSelected, setWaterSelected] = useState();
  // const [healthy, setHealthy] = useState('healthy');
  const [statusSelected, setStatusSelected] = useState([]);
  // const [issuesSelected, setIssuesSelected] = useState([]);
  // const [moreSelected, setMoreSelected] =useState(false);
  const [dateVisitMaintenance, setDateVisitMaintenance] = useState(
    datevisit || null
  );
  // const [getmedal, setMedal] = useState(false);
  const [statusSlider, setStatusSlider] = useState(status);
  const [water, setWater] = useState("water");
  const [weed, setWeed] = useState("weed");
  const [mulch, setMulch] = useState("mulch");
  const [stake, setStake] = useState("stake");
  const [brace, setBrace] = useState("brace");
  const [prune, setPrune] = useState("prune");
  // const [value, setValue] = useState("");
  const [volunteerValue, setVolunteerValue] = useState("Volunteer");
  const [commentValue, setCommentValue] = useState("");
  const [sliderValue, setSlider] = useState(health || 100);
  const [overallHealth, setOverallHealth] = useState(health || "good");

  const [showDoMaintanaince, setShowDoMaintanaince] = useState(false);

  const image =
    !tree ||
    tree.pictureurl === "None" ||
    tree.pictureurl === null ||
    tree.pictureurl === undefined
      ? "icon"
      : tree.pictureurl;
  const tree__imageclass =
    !tree || tree.pictureurl === "None" || tree.pictureurl === undefined
      ? "tree__icon"
      : "tree__image";

  const notesRef = useRef("test notes");
  const valueRef = useRef();
  const commentRef = useRef("");
  const volunteerRef = useRef("Volunteer");

  const onCheckboxBtnClick = (selected) => {
    const index = statusSelected.indexOf(selected);
    if (index < 0) {
      statusSelected.push(selected);
    } else {
      statusSelected.splice(index, 1);
    }

    setStatusSelected([...statusSelected]);
    statusSelected.includes("watered")
      ? setWater("watered")
      : setWater("water");
    statusSelected.includes("weeded") ? setWeed("weeded") : setWeed("weed");
    statusSelected.includes("mulched")
      ? setMulch("mulched")
      : setMulch("mulch");
    statusSelected.includes("staked") ? setStake("staked") : setStake("stake");
    statusSelected.includes("braced") ? setBrace("braced") : setBrace("brace");
    statusSelected.includes("pruned") ? setPrune("pruned") : setPrune("prune");
    // (statusSelected.length > 0) ? setHealthy(null) : setHealthy('healthy');
    if (statusSelected.length > 0) {
      setDateVisitMaintenance(moment().format("MMMM Do YYYY"));
    } else {
      setDateVisitMaintenance(null);
    }
  };

  // const onMoreClick = () => setMoreSelected(!moreSelected);
  // const onIssuesClick = (selected) => {
  //   const index = issuesSelected.indexOf(selected);
  //   if (index < 0) {
  //     issuesSelected.push(selected);
  //   } else {
  //     issuesSelected.splice(index, 1);
  //   }
  //   setIssuesSelected([...issuesSelected]);
  //   (issuesSelected.length > 0) ? setHealthy(null) : setHealthy('healthy');
  // }

  // const addWater = (selected) => {
  //   (waterSelected) ? setWaterDate(moment().format('MMM Do YYYY')) :setWaterDate(dateWateredFormatted) ;
  //   setWaterSelected(!waterSelected);
  //   setMedal(!getmedal);
  // };

  const handleVolunteer = (e) => setVolunteerValue(volunteerRef.current.value);
  const handleComment = (e) => setCommentValue(commentRef.current.value);
  const toggle = () => setShowTree(!showTree);

  // const handleDateVisit = () => {
  //   setDateVisit(moment().format('MMMM Do YYYY, h:mm:ss a'));
  //   setMedal(!getmedal);
  // };
  // const changeStatus = (event) => setStatus(event.target.name);

  const handleSubmit = async (event, send_data) => {
    const functionName = "handleSubmit";
    try {
      return;
    } catch (err) {
      console.log("\n\n\n\n ------", functionName, "err", err);
      return err;
    }
  };
  const unicodeArrow = !showDoMaintanaince ? "&#10140;" : "&#x2913";
  const defaultSliderValue = {
    good: 100,
    fair: 79,
    poor: 59,
    dead: 20,
    missing: 0,
  }[health];

  const changeSlider = (event) => {
    const value = event.target.value;
    if (value >= 80) setOverallHealth("good");
    if (value >= 60 && value <= 79) setOverallHealth("fair");
    if (value >= 40 && value <= 59) setOverallHealth("poor");
    if (value >= 20 && value <= 39) setOverallHealth("dead");
    if (value <= 20) setOverallHealth("stump");
    setSlider(event.target.value);
  };

  return (
    <div>
      {tree && (
        <Modal isOpen={showTree} toggle={toggle} className="tree__modal">
          <ModalHeader toggle={toggle}>
            <div className="flex-grid-three text-left">
              {common && (
                <div>
                  <h3>{common}</h3>
                </div>
              )}
              {scientific && (
                <div>
                  <h4>{scientific}</h4>
                </div>
              )}
              {planted && (
                <div>
                  <h5>Planted: {moment(planted).format("MMMM Do YYYY")}</h5>
                </div>
              )}
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="flex-grid tree_history-list text-center">
              <h4>Overall Health</h4>
            </div>
            <div className="tree__status text-center">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onBlur={handleSubmit}
                className="slider"
                id="myRange"
                onChange={changeSlider}
              />
              <h3>
                <span id={sliderValue}>{overallHealth.toUpperCase()}</span>
              </h3>
            </div>

            <div className="flex-grid border-top">
              <div className="text-center tree_history-list">
                <h4>Tree Notes</h4>
              </div>
              <div className="flex-grid tree__status">
                <textarea
                  className="form-control tree__status__textarea"
                  ref={notesRef}
                  id="notes"
                  aria-label="Tree Notes"
                  defaultValue={notes}
                ></textarea>
              </div>
            </div>

            <div className="flex-grid border-top">
              <div className="text-center tree_history-list">
                <h4>Tree Maintenance</h4>
              </div>
              <div className="tree__status__maintenance-header">
                <Button
                  className="tree__status__maintenance-btn-header btn-lg btn-block"
                  color="success"
                  onClick={() => setShowDoMaintanaince(!showDoMaintanaince)}
                >
                  Water the Trees!
                </Button>
                {!showDoMaintanaince && (
                  <img
                    className="tree__status__maintenance-header__img"
                    src="assets/images/trees/wateringcanright2.svg"
                  />
                )}
                {showDoMaintanaince && (
                  <img
                    className="tree__status__maintenance-header__img"
                    src="assets/images/trees/wateringcandown.svg"
                  />
                )}
              </div>

              {showDoMaintanaince && (
                <div className="tree__status__maintenance">
                  <div className="flex-grid tree__status">
                    <div className="flex-grid text-center">
                      Volunteer Name:
                      <input
                        ref={volunteerRef}
                        placeholder="Volunteer"
                        onBlur={handleVolunteer}
                        className="tree__status__input"
                        id="volunteerName"
                      />
                    </div>
                  </div>

                  <div className="tree__status__maintenance-buttons">
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("water")}
                      active={statusSelected.includes("water")}
                    >
                      <img src={`assets/images/trees/${water}.svg`} />
                      <h4>{water}</h4>
                    </Button>
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("mulch")}
                      active={statusSelected.includes("mulch")}
                    >
                      <img src={`assets/images/trees/${mulch}.svg`} />
                      <h4>{mulch}</h4>
                    </Button>{" "}
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("weed")}
                      active={statusSelected.includes("weed")}
                    >
                      <img src={`assets/images/trees/${weed}.svg`} />
                      <h4>{weed}</h4>
                    </Button>{" "}
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("stake")}
                      active={statusSelected.includes("stake")}
                    >
                      <img src={`assets/images/trees/${stake}.svg`} />
                      <h4>{stake}</h4>
                    </Button>{" "}
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("brace")}
                      active={statusSelected.includes("brace")}
                    >
                      <img src={`assets/images/trees/${brace}.svg`} />
                      <h4>{brace}</h4>
                    </Button>
                    <Button
                      className="tree__status__maintenance-btn btn-sm"
                      color="success"
                      onClick={() => onCheckboxBtnClick("prune")}
                      active={statusSelected.includes("prune")}
                    >
                      <img src={`assets/images/trees/${prune}.svg`} />
                      <h4>{prune}</h4>
                    </Button>
                  </div>

                  <div className="flex-grid tree__status">
                    <div className="flex-grid text-center">
                      Maintenance Comment:
                      <textarea
                        className="form-control tree__status__textarea"
                        onBlur={handleComment}
                        ref={commentRef}
                        placeholder="Maintenance Comment"
                        id="comment"
                        aria-label="Tree Notes"
                      />
                    </div>

                    {statusSelected.length > 0 && (
                      <div className="flex-grid text-center">
                        <span>
                          Maintenance Done:{" "}
                          {statusSelected.length > 0
                            ? statusSelected.join(", ")
                            : "None Yet"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-grid border-top">
              {dateVisitMaintenance && (
                <div className="text-center tree_history-list">
                  <h4>Tree Visit History</h4>
                </div>
              )}

              {dateVisitMaintenance && (
                <div className="flex-grid tree__indent">
                  {dateVisitMaintenance} tree visit by{" "}
                  {volunteerRef.current
                    ? volunteerRef.current.value
                    : "Volunteer"}
                </div>
              )}

              {dateVisitMaintenance && commentRef.current && (
                <div className="flex-grid tree__indent">
                  Comment: {commentRef.current.value}
                </div>
              )}

              {statusSelected.length > 0 && (
                <div className="flex-grid tree__indent">
                  <span>
                    Maintenance Done:{" "}
                    {statusSelected.length > 0
                      ? statusSelected.join(", ")
                      : "None Yet"}
                  </span>
                </div>
              )}

              {treeHistory &&
                treeHistory.map((history) => {
                  const {
                    id_treehistory,
                    id_tree,
                    watered,
                    mulched,
                    weeded,
                    staked,
                    braced,
                    pruned,
                    datevisit,
                    comment,
                    volunteer,
                  } = history || {};

                  return (
                    <div className="flex-grid">
                      <div className="flex-grid tree__indent">
                        {moment(datevisit).format("MMMM Do YYYY")} tree visit by{" "}
                        {volunteer || "volunteer"}
                      </div>

                      {comment && (
                        <div className="flex-grid tree__indent">
                          Comment: {comment}
                        </div>
                      )}

                      <div className="flex-grid tree__indent">
                        <span>
                          Maintenance Done: {watered && "watered"}{" "}
                          {mulched && "mulched"} {weeded && "weeded"}{" "}
                          {staked && "staked"} {braced && "braced"}{" "}
                          {pruned && "pruned"}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex-grid border-top">
              <div className="tree_history-list text-left">
                <h4 className="text-center">Location</h4>
                <div>{address}</div>
                <div>{city}</div>
                <div>Neighborhood: {neighborhood}</div>
                <div>Lat: {lat}</div>
                <div>Lng: {lng}</div>
              </div>
            </div>

            <div className="flex-grid border-top">
              <div className="tree_history-list text-left">
                <h4 className="text-center">More info</h4>
                Open Tree Standards
                <a href="https://standards.opencouncildata.org/#/trees">
                  https://standards.opencouncildata.org/#/trees
                </a>
              </div>
            </div>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </Modal>
      )}
    </div>
  );
}
