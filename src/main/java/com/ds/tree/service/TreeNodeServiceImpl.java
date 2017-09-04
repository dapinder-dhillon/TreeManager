/*
 * 
 */
package com.ds.tree.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.ds.tree.entity.TreeNode;
import com.ds.tree.repository.TreeNodeRepository;
import com.ds.tree.vo.TreeNodeVO;

/**
 * The Class TreeNodeServiceImpl.
 */
@Service
public class TreeNodeServiceImpl implements TreeNodeService {

	private static final int ROOT_NODE = -1;
	@Autowired
	private TreeNodeRepository treeNoderepository;

	/* (non-Javadoc)
	 * @see com.ds.tree.service.TreeNodeService#save(com.ds.tree.vo.TreeNodeVO)
	 */
	@Override
	public TreeNode save(TreeNodeVO treeNodeVO) {
		final TreeNode treeNode = new TreeNode();
		BeanUtils.copyProperties(treeNodeVO, treeNode);
		return treeNoderepository.save(treeNode);
	}

	/* (non-Javadoc)
	 * @see com.ds.tree.service.TreeNodeService#findAllNodes()
	 */
	@Override
	public List<TreeNodeVO> findAllNodes() {
		List<TreeNodeVO> treeNodeVOList = Collections.emptyList();
		List<TreeNode> treeNodeList = treeNoderepository.findAll();
		if (!CollectionUtils.isEmpty(treeNodeList)) {
			treeNodeVOList = new ArrayList<>(treeNodeList.size());
			for (TreeNode treeNode : treeNodeList) {
				final TreeNodeVO treeNodeVO = new TreeNodeVO();
				BeanUtils.copyProperties(treeNode, treeNodeVO);
				treeNodeVOList.add(treeNodeVO);
			}

		}
		return treeNodeVOList;
	}

	/* (non-Javadoc)
	 * @see com.ds.tree.service.TreeNodeService#removeNode(java.lang.Integer)
	 */
	@Override
	public void removeNode(final Integer id) {
		final TreeNode nodeToBeRemoved = treeNoderepository.findOne(id);
		if (null != nodeToBeRemoved) {
			final TreeNode nodeToBeRemovedParent = treeNoderepository.findOne(nodeToBeRemoved.getParentId());
			final List<TreeNode> nodeToBeRemovedChildren = treeNoderepository.findByParentId(id);
			if (!CollectionUtils.isEmpty(nodeToBeRemovedChildren)) {
				for (final TreeNode treeNode : nodeToBeRemovedChildren) {
					treeNode.setParentId(nodeToBeRemoved.getParentId());
					if (nodeToBeRemoved.getParentId() == ROOT_NODE) {
						treeNode.setLevel(NumberUtils.INTEGER_ZERO);
					} else {
						treeNode.setLevel(nodeToBeRemovedParent.getLevel() + 1);
					}
					treeNoderepository.save(treeNode);
				}
			}
			treeNoderepository.delete(nodeToBeRemoved);
		}
	}

	/* (non-Javadoc)
	 * @see com.ds.tree.service.TreeNodeService#removeAll()
	 */
	@Override
	public void removeAll() {
		treeNoderepository.deleteAll();
	}
}
