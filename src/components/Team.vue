<template>
    <div class="lists">
      <ul>
        <li v-for="(team, index) in teamList" :key="index">
          <div class="card">
            <img class="team-pic" :src="team.pic" alt="">
            <div class="team-right">
              <div class="name">{{team.name}}</div>
              <div class="role">{{team.role}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  name: "Team",
  props: ['teamList'],
  data () {
    return {
    };
  }
}
</script>
<style scoped>
.lists ul {
  overflow: hidden;
  margin: 0 10px;
}
.lists li {
  float: left;
  width: calc((100% - 50px) / 4);
  margin: 10px;
}

@media screen and (max-width: 767px) {
  .lists li {
    width: 100%;
  }
}

.lists li .card {
  background: #fff;
  padding: 25px 20px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  height: 60px;
}
.team-pic {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.team-right {
  float: left;
  margin-left: 20px;
}
.team-right .name {
  font-size: 14px;
  line-height: 14px;
  color: #0c87ff;
  margin-top: 10px;
}
.team-right .role {
  font-size: 12px;
  color: #666;
}
</style>