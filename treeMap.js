function generateTreeMap(treeData) {
  d3.select("#hierarchicalTree_SVG").remove();
  var org_data = treeData;

  var margin = { top: 0, right: 0, bottom: 0, left: 60 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;
  var svg = d3
    .select("body")
    .append("svg")
    .attr("id", "hierarchicalTree_SVG")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var i = 0,
    duration = 750,
    root;
  var treeMap = d3.tree().size([height, width]);

  // if (root.children) {
  //   root.children.forEach(collapse);
  // }

  update(org_data);
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function update(newData) {
    root = d3.hierarchy(newData, function (d) {
      return d.children;
    });
    root.x0 = height / 2;
    root.y0 = 0;
    source = root;
    var treeData = treeMap(root);
    var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);
    nodes.forEach(function (d) {
      d.y = d.depth * 200;
    });
    var node = svg.selectAll("g.node").data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });
    var nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      });

    nodeEnter
      .attr("class", "node")
      .attr("r", 1e-6)
      .style("fill", function (d) {
        return d.parent ? "rgb(39, 43, 77)" : "#fe6e9e";
      });

    nodeEnter
      .append("rect")
      .attr("class", "a")
      .attr("rx", function (d) {
        return 6;
      })
      .attr("ry", function (d) {
        return 6;
      })
      .attr("x", 0)
      .attr("y", function (d) {
        return d.parent ? -10 : -35.5;
      })
      .attr("width", function (d) {
        return d.parent ? 120 : 71;
      })
      .attr("height", function (d) {
        return d.parent ? 30 : 71;
      });

    //
    nodeEnter
      .append("text")
      .attr("dy", ".32em")
      .attr("x", "0")
      .attr("y", function (d) {
        return d.parent ? -15 : -40;
      })
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("cursor", "pointer")
      .style("fill", "#025a57")
      .text("+")
      .on("click", addNode);

    nodeEnter
      .append("text")
      .attr("dy", ".32em")
      .attr("x", "10")
      .attr("y", function (d) {
        return d.parent ? -15 : -40;
      })
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("cursor", "pointer")
      .style("fill", "#025a57")
      .text("-")
      .on("click", removeNode);

    nodeEnter
      .append("circle")
      .attr("cx", function (d) {
        return d.parent ? 120 : 69;
      })
      .attr("cy", function (d) {
        return d.parent ? -9 : -36;
      })
      .attr("r", "5.846")
      .style("fill", "#f5f5f5")
      .style("stroke", "antiquewhite");

    var cap_g = nodeEnter.append("g").attr("transform", function (d) {
      return d.parent ? "translate(10,-3)" : "translate(28,-20)";
    });

    cap_g
      .append("path")
      .attr("class", "u")
      .attr("d", function (d) {
        if (d.parent) {
          return "M10.641,3.226c.352-.2.658-.376.963-.552L15.339.505c.247-.143.5-.272.744-.424a.437.437,0,0,1,.509,0c.831.485,1.67.959,2.5,1.44q1.352.779,2.7,1.564c.065.038.124.085.213.146-.772.443-1.516.866-2.256,1.3q-1.451.842-2.9,1.691a3.2,3.2,0,0,1-.41.227.326.326,0,0,1-.251-.016c-1.18-.68-2.354-1.371-3.532-2.053-.652-.378-1.311-.746-2.023-1.15";
        }
        return "M7.657,0a1.731,1.731,0,0,1,.79.344q1.258.746,2.509,1.5,1.544.929,3.087,1.86c.326.2.658.384.98.587A.385.385,0,0,1,15,5Q13.07,6.159,11.147,7.32,9.469,8.328,7.788,9.331a.246.246,0,0,1-.21,0C6.436,8.651,5.3,7.957,4.159,7.273,3.134,6.658,2.1,6.051,1.076,5.44.83,5.294.581,5.151.342,4.993a.4.4,0,0,1,0-.7c.535-.335,1.082-.65,1.622-.975L5.43,1.234C6.048.862,6.665.489,7.288.125A1.889,1.889,0,0,1,7.657,0";
      })
      .attr("transform", function (d) {
        if (d.parent) {
          return "translate(-9.874 0)";
        }
        return "translate(-0.127)";
      });

    cap_g
      .append("path")
      .attr("class", "u")
      .attr("d", function (d) {
        if (d.parent) {
          return "M106.928,64.364v.268q0,3.02,0,6.04a.33.33,0,0,1-.2.339c-1.7.975-3.392,1.965-5.087,2.95-.125.073-.254.139-.4.217,0-2.15,0-4.271.007-6.392a.391.391,0,0,1,.172-.276c.6-.359,1.215-.7,1.822-1.048q1.7-.984,3.4-1.972c.079-.046.167-.075.281-.125";
        }
        return "M15.3,150.78a.409.409,0,0,1-.242.377c-.917.553-1.832,1.11-2.75,1.662q-1.714,1.032-3.431,2.058c-.329.2-.664.386-.989.589a.238.238,0,0,1-.291,0c-.767-.466-1.539-.923-2.309-1.384L3.15,152.8c-.84-.5-1.682-1.007-2.518-1.519a1.322,1.322,0,0,1-.4-.345.375.375,0,0,1,.15-.484c.3-.18.6-.358.9-.529a.169.169,0,0,1,.141.013q1.983,1.192,3.963,2.389,1.117.673,2.24,1.339a.246.246,0,0,0,.21.006c1.012-.6,2.018-1.214,3.028-1.82.887-.532,1.776-1.059,2.664-1.589a4.224,4.224,0,0,0,.456-.28.219.219,0,0,1,.3-.016c.267.168.544.319.808.49a.364.364,0,0,1,.209.324";
      })
      .attr("transform", function (d) {
        if (d.parent) {
          return "translate(-93.945 -59.724)";
        }
        return "translate(-0.183 -142.479)";
      });

    cap_g
      .append("path")
      .attr("class", "u")
      .attr("d", function (d) {
        if (d.parent) {
          return "M5.68,74.658c-.575-.331-1.107-.636-1.637-.942l-3-1.735c-.308-.178-.617-.353-.918-.542a.29.29,0,0,1-.124-.2Q0,68.067,0,64.9a.286.286,0,0,1,.023-.055c.309.169.619.331.921.506q1.5.865,3,1.738c.54.314,1.079.63,1.613.954a.279.279,0,0,1,.119.2c.006,2.121.005,4.242.005,6.417";
        }
        return "M7.567,230.9a1.245,1.245,0,0,1-.657-.274c-1.172-.7-2.34-1.4-3.509-2.1-1.051-.631-2.106-1.256-3.151-1.9a.4.4,0,0,1-.01-.737c.261-.167.527-.328.8-.478a.27.27,0,0,1,.227,0c1.081.645,2.155,1.3,3.234,1.949q1.473.885,2.953,1.758a.25.25,0,0,0,.213-.007q3.079-1.842,6.154-3.688a.312.312,0,0,1,.262-.008c.289.158.568.334.846.51a.367.367,0,0,1,.007.641c-.662.41-1.328.811-1.994,1.212q-1.621.975-3.246,1.946c-.575.344-1.149.69-1.728,1.025a2.374,2.374,0,0,1-.4.146";
      })
      .attr("transform", function (d) {
        if (d.parent) {
          return "translate(0 -60.169)";
        }
        return "translate(0 -214.212)";
      });

    nodeEnter
      .append("text")
      .attr("dy", ".32em")
      .attr("x", function (d) {
        return d.parent ? 119 : 68;
      })
      .attr("y", function (d) {
        return d.parent ? -9 : -36;
      })
      .style("font-size", "8px")
      .style("font-weight", "700")
      // .style("font-style", "italic")
      .style("font-family", "Roboto-Bold, Roboto")
      .style("fill", "#025a57")
      .style("cursor", "pointer")
      .text("i");

    //

    nodeEnter
      .append("text")
      .style("fill", function (d) {
        return "black";
      })
      .attr("dy", ".32em")
      .attr("y", function (d) {
        return d.parent ? 6 : 15;
      })
      .attr("x", function (d) {
        return d.parent ? 50 : 37;
      })
      .attr("text-anchor", function (d) {
        return "middle";
      })
      .text(function (d) {
        return d.data.name;
      });

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();
    nodeExit.select("rect").style("opacity", 1e-6);
    nodeExit.select("rect").attr("stroke-opacity", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);
    var link = svg.selectAll("path.link").data(links, function (d) {
      return d.id;
    });
    var linkEnter = link
      .enter()
      .insert("path", "g")
      .attr("class", "link")
      .attr("d", function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });
    var linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(duration)
      .attr("d", function (d) {
        return diagonal(d, d.parent);
      });
    var linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr("d", function (d) {
        var o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    function diagonal(s, d) {
      path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

      return path;
    }
    function click_org(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function click(d) {
      if (d.children) {
        addRemoveNode("remove", d, org_data);
      } else {
        addRemoveNode("add", d, org_data);
      }
    }
  }

  function addNode(currentNode) {
    var updatedData = getUpdatedData("add", currentNode, treeData);
    generateTreeMap(updatedData);
  }

  function removeNode(currentNode) {
    var updatedData = getUpdatedData("remove", currentNode, treeData);
    generateTreeMap(updatedData);
  }

  function addRemoveNode(addRemove, currentNode, treeData) {
    var updatedData = getUpdatedData(addRemove, currentNode, treeData);
    generateTreeMap(updatedData);
    //update(updatedData);
  }

  function getUpdatedData(addRemove, currentNode, treeData) {
    var newNode = {
      id: getGUID(),
      name: "Product",
    };

    var result = treeData;

    if (addRemove == "add") {
      result = updateJSON(treeData, currentNode.data.id, newNode);
    } else if (addRemove == "remove") {
      debugger;
      if (currentNode.depth == 0) {
        result = removeChildrenJSON(treeData, currentNode.data.id);
      } else {
        result = removeNodeAndChildrenJSON(treeData, currentNode.data.id);
      }
    }
    return result;
  }

  function updateJSON(jsonObj, targetId, newObject) {
    if (jsonObj.id === targetId) {
      if (jsonObj.children) {
        jsonObj.children.push(newObject);
      } else {
        jsonObj.children = [newObject];
      }
    } else if (jsonObj.children) {
      for (let i = 0; i < jsonObj.children.length; i++) {
        updateJSON(jsonObj.children[i], targetId, newObject);
      }
    }
    return jsonObj;
  }

  function removeChildrenJSON(jsonObj, targetId) {
    if (jsonObj.id === targetId) {
      delete jsonObj.children;
    } else if (jsonObj.children) {
      jsonObj.children.forEach(function (child) {
        removeChildrenJSON(child, targetId);
      });
    }
    return jsonObj;
  }

  function removeNodeAndChildrenJSON(jsonObj, targetId) {
    if (jsonObj.id === targetId) {
      delete jsonObj.children;
      return null; // Return null to indicate that this object should be removed from its parent.
    } else if (jsonObj.children) {
      jsonObj.children = jsonObj.children.filter(function (child) {
        return removeNodeAndChildrenJSON(child, targetId) !== null; // Filter out null values (removed objects).
      });
    }
    return jsonObj;
  }
}

function getGUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
