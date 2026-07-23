import lodash from "lodash";

function getInfoData({ fields = [], object = {} }) {
  return lodash.pick(object, fields);
}

export default getInfoData;
