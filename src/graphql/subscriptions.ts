// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateGroup = `subscription OnCreateGroup {
  onCreateGroup {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onUpdateGroup = `subscription OnUpdateGroup {
  onUpdateGroup {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onDeleteGroup = `subscription OnDeleteGroup {
  onDeleteGroup {
    id
    name
    devices {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const onCreateDevice = `subscription OnCreateDevice {
  onCreateDevice {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
export const onUpdateDevice = `subscription OnUpdateDevice {
  onUpdateDevice {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
export const onDeleteDevice = `subscription OnDeleteDevice {
  onDeleteDevice {
    id
    title
    group {
      id
      name
      devices {
        nextToken
      }
    }
  }
}
`;
