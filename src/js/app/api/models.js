export class Entity {
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

export class Task extends Entity {
  constructor(name = 'default task') {
    super();
    this.name = name;
  }
}

export class Project extends Entity {
  constructor(name = 'untitled project') {
    super();
    this.name = name;
  }
}

export class Log extends Entity {
  constructor(projectId, description = '') {
    super();
    this.project = projectId;
    this.description = description;
    this.startTime = (new Date()).getTime();
    this.endTime = 0;
  }
}

export class Transformer {
  static listSnapshotToArray(snapshot) {
    let projects = [];
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      childData.id = childKey;
      projects.push(childData);
    });

    return projects;
  }
}