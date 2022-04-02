const fs = require('fs');

/**
 * Get and parse the contents of the project package.json file.
 *
 * @param {string} path Path to where the package.json should reside.
 * @param {bool} throwError Whether to throw an error when the package.json does not exist.
 * @returns {object}
 */
const getPackage = (path, throwError = true) => {
  let packageName = '';

  const packagePath = `${path}/package.json`;

  if (!fs.existsSync(packagePath)) {
    if (throwError) {
      throw new Error(`package.json does not exist for this project.\n\nPlease create one in: ${path}`);
    }

    return false;
  }

  const packageJSON = JSON.parse(fs.readFileSync(packagePath));
  const packageObject = packageJSON === Object(packageJSON) ? packageJSON : {};
  const packageNames = packageObject?.name?.split('/');
  packageName = packageNames?.[packageNames.length - 1] || '';

  return {
    path,
    packagePath,
    packageName,
    package: packageObject,
  };
};

module.exports = {
  getPackage,
};
