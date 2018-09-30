function scaleSVG(svgPath, targetSize) {
    var pathAsArray = svgPath.split(" ");
    var scaleFactor = getScaleFactor(pathAsArray, targetSize);
    var scaledPath = "";
    
    // Imperative
    for (var i = 0; i < pathAsArray.length; i++) {
        switch (pathAsArray[i]) {
            case "M":
                scaledPath += scaleSection(
                    pathAsArray,
                    "M",
                    scaleFactor,
                    i,
                    2,
                );
                i += 2;
                break;
            case "L":
                scaledPath += scaleSection(
                    pathAsArray,
                    "L",
                    scaleFactor,
                    i,
                    2,
                );
                i += 2;
                break;
            case "Q":
                scaledPath += scaleSection(
                    pathAsArray,
                    "Q",
                    scaleFactor,
                    i,
                    4,
                );
                i += 4;
                break;
            case "C":
                scaledPath += scaleSection(
                    pathAsArray,
                    "C",
                    scaleFactor,
                    i,
                    6,
                );
                i += 6;
                break;
            case "A":
                scaledPath += scaleSection(
                    pathAsArray,
                    "A",
                    scaleFactor,
                    i,
                    2,
                );
                scaledPath += 
                    pathAsArray[i + 3] + " " +
                    pathAsArray[i + 4] + " " +
                    pathAsArray[i + 5];
                scaledPath += scaleSection(
                    pathAsArray,
                    "",
                    scaleFactor,
                    i + 5,
                    2,
                );
                i += 7;
                break;
            default:
                console.error("Error: Unknown symbol (" + pathAsArray[i] + ")");
        }
    }
    return scaledPath;
}

function scaleSection(path, symbol, scaleFactor, index, numBits) {
    var section = symbol + " ";
    for (var i = 1; i <= numBits; i++) {
        section += path[index + i] * scaleFactor + " ";
    }
    return section;
}

function getScaleFactor(pathAsArray, targetSize) {
    var greatestDist = 0;

    pathAsArray.forEach((item) => {
        // Filter so greatest size is a number
        if (Number(item) > greatestDist) {
            greatestDist = Number(item);
        }
    });

    return targetSize / greatestDist;
}
